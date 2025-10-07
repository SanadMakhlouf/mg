import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import './InteractiveMap.css';

const InteractiveMap = () => {
  const navigate = useNavigate();
  const mapDiv = useRef(null);
  const sceneViewRef = useRef(null);
  const [isViewReady, setIsViewReady] = useState(false);
  const [currentBasemap, setCurrentBasemap] = useState('streets-navigation-vector');
  const mountedRef = useRef(false);

  // Initialize ArcGIS 3D Map
  useEffect(() => {
    if (mapDiv.current && !mountedRef.current) {
      mountedRef.current = true;

      // Load the pre-configured WebScene from ArcGIS Online
      const webscene = new WebScene({
        portalItem: {
          id: "bf7310c8edf14000a58a883b97d0c9ad" // Beautiful 3D scene with buildings
        }
      });

      // Create the 3D scene view
      const view = new SceneView({
        container: mapDiv.current,
        map: webscene,
        qualityProfile: 'high',
        environment: {
          atmosphere: {
            quality: 'high'
          },
          lighting: {
            directShadowsEnabled: true
          }
        }
      });

      sceneViewRef.current = view;

      // Wait for view to be ready, THEN set camera position
      view.when(() => {
        console.log('SceneView is ready');
        
        // Override the WebScene's default camera with our custom position
        view.goTo({
          position: {
            x: 54.350047, // longitude (custom coordinates)
            y: 24.482752, // latitude (custom coordinates)
            z: 5000 // altitude in meters (lower for closer view)
          },
          tilt: 65,
          heading: 0
        }, {
          animate: false // No animation, instant position
        }).then(() => {
          setIsViewReady(true);
          console.log('Camera set to custom position');
        });
        
      }).catch((error) => {
        console.error('Error loading SceneView:', error);
        setIsViewReady(false);
      });

      return () => {
        if (view) {
          view.destroy();
          sceneViewRef.current = null;
          mountedRef.current = false;
        }
      };
    }
  }, []);

  const changeBasemap = (basemapId) => {
    if (sceneViewRef.current && isViewReady) {
      try {
        const newBasemap = Basemap.fromId(basemapId);
        sceneViewRef.current.map.basemap = newBasemap;
        setCurrentBasemap(basemapId);
        console.log('Basemap changed to:', basemapId);
      } catch (error) {
        console.error('Error changing basemap:', error);
      }
    }
  };

  const zoomToFeature = async (view, objectId) => {
    try {
      // Wait for all layers to load
      await view.when();
      
      // Get all layers from the webscene
      const layers = view.map.allLayers;
      
      console.log('Searching for object ID:', objectId);
      console.log('Available layers:', layers.length);
      
      // Search through all layers for the feature
      for (const layer of layers.items) {
        if (layer.type === 'scene' || layer.type === 'feature') {
          try {
            // Query the layer for the specific object ID
            const query = layer.createQuery();
            query.objectIds = [objectId];
            query.returnGeometry = true;
            query.outFields = ['*'];
            
            const result = await layer.queryFeatures(query);
            
            if (result.features.length > 0) {
              const feature = result.features[0];
              console.log('Found feature:', feature);
              
              // Zoom to the feature
              view.goTo({
                target: feature,
                zoom: 18, // Close zoom level to see the building
                tilt: 65,
                heading: 0
              }, {
                duration: 3000,
                easing: 'ease-in-out'
              });
              
              // Optionally highlight the feature
              view.whenLayerView(layer).then((layerView) => {
                layerView.highlight(feature);
              });
              
              return; // Stop searching once found
            }
          } catch (err) {
            // Layer doesn't support queries or feature not found, continue
            console.log('Layer query failed:', layer.title, err.message);
          }
        }
      }
      
      console.warn('Feature with object ID', objectId, 'not found in any layer');
    } catch (error) {
      console.error('Error zooming to feature:', error);
    }
  };

  const handleResetView = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        position: {
          x: 54.3705,
          y: 24.4764,
          z: 50000
        },
        tilt: 65,
        heading: 0
      }, {
        duration: 2000,
        easing: 'ease-in-out'
      });
    }
  };

  const handleTopView = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        tilt: 0,
        heading: 0
      }, {
        duration: 1500,
        easing: 'ease-in-out'
      });
    }
  };

  const handleTiltView = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        tilt: 75
      }, {
        duration: 1500,
        easing: 'ease-in-out'
      });
    }
  };

  const handleRotate = () => {
    if (sceneViewRef.current && isViewReady) {
      const currentHeading = sceneViewRef.current.camera.heading;
      sceneViewRef.current.goTo({
        heading: currentHeading + 90
      }, {
        duration: 1000,
        easing: 'ease-in-out'
      });
    }
  };

  const handleZoomIn = () => {
    if (sceneViewRef.current && isViewReady) {
      const currentZ = sceneViewRef.current.camera.position.z;
      sceneViewRef.current.goTo({
        position: {
          x: sceneViewRef.current.camera.position.x,
          y: sceneViewRef.current.camera.position.y,
          z: currentZ * 0.5
        }
      }, {
        duration: 800,
        easing: 'ease-in-out'
      });
    }
  };

  const handleZoomOut = () => {
    if (sceneViewRef.current && isViewReady) {
      const currentZ = sceneViewRef.current.camera.position.z;
      sceneViewRef.current.goTo({
        position: {
          x: sceneViewRef.current.camera.position.x,
          y: sceneViewRef.current.camera.position.y,
          z: currentZ * 2
        }
      }, {
        duration: 800,
        easing: 'ease-in-out'
      });
    }
  };

  const handleZoomToStreet = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        position: {
          x: sceneViewRef.current.camera.position.x,
          y: sceneViewRef.current.camera.position.y,
          z: 500 // Street level - 500m
        },
        tilt: 75
      }, {
        duration: 1500,
        easing: 'ease-in-out'
      });
    }
  };

  const handleZoomToCity = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        position: {
          x: sceneViewRef.current.camera.position.x,
          y: sceneViewRef.current.camera.position.y,
          z: 15000 // City level - 15km
        },
        tilt: 65
      }, {
        duration: 1500,
        easing: 'ease-in-out'
      });
    }
  };

  const handleZoomToCountry = () => {
    if (sceneViewRef.current && isViewReady) {
      sceneViewRef.current.goTo({
        position: {
          x: 54.3705,
          y: 24.4764,
          z: 200000 // Country level - 200km
        },
        tilt: 45
      }, {
        duration: 2000,
        easing: 'ease-in-out'
      });
    }
  };

  const goToLocation = (location) => {
    if (!sceneViewRef.current || !isViewReady) return;

    const locations = {
      dubai: { x: 55.2708, y: 25.2048, z: 15000 }, // Dubai Downtown
      abudhabi: { x: 54.3705, y: 24.4764, z: 15000 }, // Abu Dhabi Corniche
      sharjah: { x: 55.3781, y: 25.3463, z: 15000 }, // Sharjah City
      rasalkhaimah: { x: 55.9432, y: 25.7893, z: 15000 }, // RAK City
      fujairah: { x: 56.3261, y: 25.1288, z: 15000 }, // Fujairah City
      ajman: { x: 55.5136, y: 25.4052, z: 10000 }, // Ajman City
      ummalquwain: { x: 55.5547, y: 25.5647, z: 10000 } // UAQ City
    };

    const coords = locations[location];
    if (coords) {
      sceneViewRef.current.goTo({
        position: coords,
        tilt: 65,
        heading: 0
      }, {
        duration: 2000,
        easing: 'ease-in-out'
      });
    }
  };

  return (
    <div className="interactive-map-page">
      {/* Header */}
      <div className="map-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="map-title">
          <h1>Interactive 3D Property Map</h1>
          <span className="beta-badge">BETA</span>
        </div>
        <button className="menu-btn" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i>
        </button>
      </div>

      {/* 3D Controls Panel */}
      <div className="controls-panel">
        <div className="control-section">
          <h3>Camera Controls</h3>
          <div className="control-buttons">
            <button className="control-btn" onClick={handleResetView} title="Reset View" disabled={!isViewReady}>
              <i className="fas fa-undo"></i>
              <span>Reset</span>
            </button>
            <button className="control-btn" onClick={handleTopView} title="Top View" disabled={!isViewReady}>
              <i className="fas fa-arrows-alt"></i>
              <span>Top View</span>
            </button>
            <button className="control-btn" onClick={handleTiltView} title="Tilt View" disabled={!isViewReady}>
              <i className="fas fa-level-down-alt"></i>
              <span>Tilt</span>
            </button>
            <button className="control-btn" onClick={handleRotate} title="Rotate 90°" disabled={!isViewReady}>
              <i className="fas fa-sync-alt"></i>
              <span>Rotate</span>
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Zoom</h3>
          <div className="control-buttons">
            <button className="control-btn" onClick={handleZoomIn} title="Zoom In" disabled={!isViewReady}>
              <i className="fas fa-search-plus"></i>
              <span>Zoom In</span>
            </button>
            <button className="control-btn" onClick={handleZoomOut} title="Zoom Out" disabled={!isViewReady}>
              <i className="fas fa-search-minus"></i>
              <span>Zoom Out</span>
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Zoom Presets</h3>
          <div className="control-buttons">
            <button className="control-btn zoom-preset" onClick={handleZoomToStreet} title="Street Level (500m)" disabled={!isViewReady}>
              <i className="fas fa-road"></i>
              <span>Street</span>
            </button>
            <button className="control-btn zoom-preset" onClick={handleZoomToCity} title="City Level (15km)" disabled={!isViewReady}>
              <i className="fas fa-city"></i>
              <span>City</span>
            </button>
            <button className="control-btn zoom-preset" onClick={handleZoomToCountry} title="Country Level (200km)" disabled={!isViewReady}>
              <i className="fas fa-globe-asia"></i>
              <span>Country</span>
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Basemap</h3>
          <div className="location-buttons">
            <button 
              className={`location-btn ${currentBasemap === 'streets-navigation-vector' ? 'active' : ''}`}
              onClick={() => changeBasemap('streets-navigation-vector')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-directions"></i> Navigation
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'satellite' ? 'active' : ''}`}
              onClick={() => changeBasemap('satellite')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-satellite"></i> Satellite
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'hybrid' ? 'active' : ''}`}
              onClick={() => changeBasemap('hybrid')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-map"></i> Hybrid
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'streets' ? 'active' : ''}`}
              onClick={() => changeBasemap('streets')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-road"></i> Streets
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'topo' ? 'active' : ''}`}
              onClick={() => changeBasemap('topo')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-mountain"></i> Topographic
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'dark-gray' ? 'active' : ''}`}
              onClick={() => changeBasemap('dark-gray')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-moon"></i> Dark
            </button>
            <button 
              className={`location-btn ${currentBasemap === 'gray' ? 'active' : ''}`}
              onClick={() => changeBasemap('gray')} 
              disabled={!isViewReady}
            >
              <i className="fas fa-square"></i> Gray
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Quick Locations</h3>
          <div className="location-buttons">
            <button className="location-btn" onClick={() => goToLocation('dubai')} disabled={!isViewReady}>
              <i className="fas fa-building"></i> Dubai
            </button>
            <button className="location-btn" onClick={() => goToLocation('abudhabi')} disabled={!isViewReady}>
              <i className="fas fa-landmark"></i> Abu Dhabi
            </button>
            <button className="location-btn" onClick={() => goToLocation('sharjah')} disabled={!isViewReady}>
              <i className="fas fa-city"></i> Sharjah
            </button>
            <button className="location-btn" onClick={() => goToLocation('rasalkhaimah')} disabled={!isViewReady}>
              <i className="fas fa-mountain"></i> RAK
            </button>
            <button className="location-btn" onClick={() => goToLocation('fujairah')} disabled={!isViewReady}>
              <i className="fas fa-water"></i> Fujairah
            </button>
            <button className="location-btn" onClick={() => goToLocation('ajman')} disabled={!isViewReady}>
              <i className="fas fa-map-marked-alt"></i> Ajman
            </button>
            <button className="location-btn" onClick={() => goToLocation('ummalquwain')} disabled={!isViewReady}>
              <i className="fas fa-map-marker-alt"></i> UAQ
            </button>
          </div>
        </div>

        {!isViewReady && (
          <div className="loading-indicator">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading 3D Map...</span>
          </div>
        )}
      </div>

      {/* ArcGIS Map Container */}
      <div ref={mapDiv} className="arcgis-map-container"></div>

      {/* Info Banner */}
      {isViewReady && (
        <div className="info-banner">
          <i className="fas fa-info-circle"></i>
          <span>Use mouse to pan, scroll to zoom, right-click + drag to rotate</span>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
