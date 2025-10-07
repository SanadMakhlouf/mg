import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import PointSymbol3D from '@arcgis/core/symbols/PointSymbol3D';
import IconSymbol3DLayer from '@arcgis/core/symbols/IconSymbol3DLayer';
import config from '../../config';
import './InteractiveMap.css';

const InteractiveMap = () => {
  const navigate = useNavigate();
  const mapDiv = useRef(null);
  const sceneViewRef = useRef(null);
  const [isViewReady, setIsViewReady] = useState(false);
  const [currentBasemap, setCurrentBasemap] = useState('streets-navigation-vector');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyPopup, setShowPropertyPopup] = useState(false);
  const mountedRef = useRef(false);
  const graphicsLayerRef = useRef(null);
  const highlightRef = useRef(null);

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

      // Create graphics layer for property markers
      const graphicsLayer = new GraphicsLayer({
        title: "Property Markers",
        elevationInfo: {
          mode: "relative-to-ground",
          offset: 50
        }
      });
      graphicsLayerRef.current = graphicsLayer;
      webscene.add(graphicsLayer);

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

        // Add click handler for property markers
        view.on("click", (event) => {
          view.hitTest(event).then((response) => {
            if (response.results.length > 0) {
              const graphic = response.results.find(
                (result) => result.graphic && result.graphic.layer === graphicsLayer
              );
              
              if (graphic) {
                const propertyData = graphic.graphic.attributes;
                handlePropertyClick(propertyData);
              }
            }
          });
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

  // Dummy property data
  const dummyProperties = [
    {
      id: 1,
      title: "Luxury Waterfront Villa - Al Raha Beach",
      price: "4500000",
      propertyType: "sale",
      beds: 5,
      baths: 6,
      area: 6500,
      location: "Al Raha Beach, Abu Dhabi",
      description: "Stunning 5-bedroom villa with private beach access, infinity pool, and panoramic sea views. Modern architecture with premium finishes throughout.",
      pictures: ["/test.jpg"],
      latitude: 24.5147,
      longitude: 54.6158
    },
    {
      id: 2,
      title: "Modern Apartment - Corniche Towers",
      price: "85000",
      propertyType: "rental",
      beds: 2,
      baths: 2,
      area: 1450,
      location: "Corniche Road, Abu Dhabi",
      description: "Elegant 2-bedroom apartment with stunning Corniche views. Fully furnished with modern amenities, gym, and pool access.",
      pictures: ["/test.jpg"],
      latitude: 24.4764,
      longitude: 54.3705
    },
    {
      id: 3,
      title: "Penthouse Suite - Saadiyat Island",
      price: "8900000",
      propertyType: "sale",
      beds: 4,
      baths: 5,
      area: 5200,
      location: "Saadiyat Island, Abu Dhabi",
      description: "Exclusive penthouse with 360-degree views of the Arabian Gulf. Private elevator, rooftop terrace, and smart home technology.",
      pictures: ["/test.jpg"],
      latitude: 24.5398,
      longitude: 54.4345
    },
    {
      id: 4,
      title: "Sky Gardens Residence - Al Reem Island",
      price: "3200000",
      propertyType: "offplan",
      beds: 3,
      baths: 4,
      area: 2800,
      location: "Al Reem Island, Abu Dhabi",
      description: "Off-plan luxury development with sky gardens on every floor. Expected completion Q4 2026. Premium amenities and prime location.",
      pictures: ["/test.jpg"],
      latitude: 24.4965,
      longitude: 54.4011
    },
    {
      id: 5,
      title: "Family Villa - Khalifa City",
      price: "120000",
      propertyType: "rental",
      beds: 4,
      baths: 4,
      area: 3500,
      location: "Khalifa City A, Abu Dhabi",
      description: "Spacious 4-bedroom villa in family-friendly community. Private garden, maid's room, and covered parking for 3 cars.",
      pictures: ["/test.jpg"],
      latitude: 24.4239,
      longitude: 54.5986
    },
    {
      id: 6,
      title: "Marina Residences - Yas Island",
      price: "2850000",
      propertyType: "offplan",
      beds: 2,
      baths: 3,
      area: 1950,
      location: "Yas Island, Abu Dhabi",
      description: "Waterfront living at its finest. Off-plan development with marina views, beach access, and resort-style amenities. Completion 2027.",
      pictures: ["/test.jpg"],
      latitude: 24.4672,
      longitude: 54.6086
    },
    {
      id: 7,
      title: "Executive Studio - Al Maryah Island",
      price: "65000",
      propertyType: "rental",
      beds: 1,
      baths: 1,
      area: 850,
      location: "Al Maryah Island, Abu Dhabi",
      description: "Modern studio apartment in the heart of Abu Dhabi's financial district. Walking distance to The Galleria and premium dining.",
      pictures: ["/test.jpg"],
      latitude: 24.5028,
      longitude: 54.3897
    },
    {
      id: 8,
      title: "Beachfront Palace - Saadiyat",
      price: "15500000",
      propertyType: "sale",
      beds: 7,
      baths: 8,
      area: 12000,
      location: "Saadiyat Beach, Abu Dhabi",
      description: "Ultra-luxury beachfront palace with private beach, tennis court, and cinema room. Architectural masterpiece with imported materials.",
      pictures: ["/test.jpg"],
      latitude: 24.5556,
      longitude: 54.4512
    },
    {
      id: 9,
      title: "City View Apartment - Downtown",
      price: "2100000",
      propertyType: "sale",
      beds: 3,
      baths: 3,
      area: 2100,
      location: "Downtown Abu Dhabi",
      description: "Contemporary 3-bedroom apartment with floor-to-ceiling windows. Close to cultural landmarks and premium shopping.",
      pictures: ["/test.jpg"],
      latitude: 24.4539,
      longitude: 54.3773
    },
    {
      id: 10,
      title: "Green Community Villa - Al Reef",
      price: "95000",
      propertyType: "rental",
      beds: 3,
      baths: 3,
      area: 2800,
      location: "Al Reef, Abu Dhabi",
      description: "Eco-friendly villa in sustainable community with parks and cycling paths. Solar panels, energy-efficient design, and community pool.",
      pictures: ["/test.jpg"],
      latitude: 24.3994,
      longitude: 54.6194
    },
    {
      id: 11,
      title: "Business Bay Tower - Capital Gate",
      price: "4200000",
      propertyType: "offplan",
      beds: 2,
      baths: 2,
      area: 1600,
      location: "Capital Gate District, Abu Dhabi",
      description: "Off-plan commercial and residential tower in prime business district. Smart offices, coworking spaces, and luxury residences. 2028 completion.",
      pictures: ["/test.jpg"],
      latitude: 24.4186,
      longitude: 54.4344
    },
    {
      id: 12,
      title: "Heritage Mansion - Al Mushrif",
      price: "6800000",
      propertyType: "sale",
      beds: 6,
      baths: 7,
      area: 8500,
      location: "Al Mushrif, Abu Dhabi",
      description: "Classic Arabian architecture meets modern luxury. Grand entrance, multiple living areas, staff quarters, and lush landscaped gardens.",
      pictures: ["/test.jpg"],
      latitude: 24.4422,
      longitude: 54.4586
    }
  ];

  // Load properties (using dummy data)
  useEffect(() => {
    if (isViewReady) {
      console.log('Loading dummy properties:', dummyProperties.length);
      setProperties(dummyProperties);

      // Add all dummy properties to the map
      dummyProperties.forEach(property => {
        addPropertyMarker(property);
      });
    }
  }, [isViewReady]);

  // Add property marker to map
  const addPropertyMarker = (property) => {
    if (!graphicsLayerRef.current || !property.latitude || !property.longitude) return;

    const point = {
      type: "point",
      longitude: parseFloat(property.longitude),
      latitude: parseFloat(property.latitude),
      z: 0
    };

    // Different colors for different property types
    const colorMap = {
      sale: [255, 69, 0],      // Red-Orange for Sale
      rental: [30, 144, 255],  // Dodger Blue for Rental
      offplan: [50, 205, 50]   // Lime Green for Off-Plan
    };

    const symbol = new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          resource: {
            primitive: "circle"
          },
          material: {
            color: colorMap[property.propertyType] || [255, 69, 0]
          },
          size: 20,
          outline: {
            color: [255, 255, 255, 0.9],
            size: 2
          }
        })
      ]
    });

    const getImageUrl = (pictures) => {
      if (!pictures || pictures.length === 0) return '/test.jpg';
      const pic = pictures[0];
      if (pic.startsWith('http')) return pic;
      return `${config.API_URL.replace('/api', '')}/storage/${pic}`;
    };

    const graphic = new Graphic({
      geometry: point,
      symbol: symbol,
      attributes: {
        id: property.id,
        title: property.title,
        price: property.price,
        propertyType: property.propertyType,
        beds: property.beds,
        baths: property.baths,
        area: property.area,
        location: property.location,
        description: property.description,
        image: getImageUrl(property.pictures)
      }
    });

    graphicsLayerRef.current.add(graphic);
  };

  // Handle property marker click
  const handlePropertyClick = (propertyData) => {
    console.log('Property clicked:', propertyData);
    setSelectedProperty(propertyData);
    setShowPropertyPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPropertyPopup(false);
    setSelectedProperty(null);
  };

  // Navigate to property details
  const viewPropertyDetails = () => {
    if (selectedProperty) {
      navigate(`/property/${selectedProperty.id}`);
    }
  };

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
          <span>Use mouse to pan, scroll to zoom, right-click + drag to rotate • Click markers to view property details</span>
        </div>
      )}

      {/* Property Popup */}
      {showPropertyPopup && selectedProperty && (
        <>
          <div className="property-popup-overlay" onClick={closePopup}></div>
          <div className="property-popup">
            <button className="popup-close-btn" onClick={closePopup}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="popup-image">
              <img src={selectedProperty.image} alt={selectedProperty.title} />
              <div className="property-type-badge">
                {selectedProperty.propertyType === 'sale' && '🏠 For Sale'}
                {selectedProperty.propertyType === 'rental' && '🏢 For Rent'}
                {selectedProperty.propertyType === 'offplan' && '🏗️ Off-Plan'}
              </div>
            </div>

            <div className="popup-content">
              <h2>{selectedProperty.title}</h2>
              
              <div className="popup-price">
                AED {parseFloat(selectedProperty.price).toLocaleString()}
                {selectedProperty.propertyType === 'rental' && '/month'}
              </div>

              {selectedProperty.location && (
                <div className="popup-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {selectedProperty.location}
                </div>
              )}

              <div className="popup-features">
                {selectedProperty.beds && (
                  <div className="feature-item">
                    <i className="fas fa-bed"></i>
                    <span>{selectedProperty.beds} Beds</span>
                  </div>
                )}
                {selectedProperty.baths && (
                  <div className="feature-item">
                    <i className="fas fa-bath"></i>
                    <span>{selectedProperty.baths} Baths</span>
                  </div>
                )}
                {selectedProperty.area && (
                  <div className="feature-item">
                    <i className="fas fa-ruler-combined"></i>
                    <span>{selectedProperty.area} sqft</span>
                  </div>
                )}
              </div>

              {selectedProperty.description && (
                <div className="popup-description">
                  <p>{selectedProperty.description.substring(0, 150)}...</p>
                </div>
              )}

              <button className="popup-view-btn" onClick={viewPropertyDetails}>
                <i className="fas fa-eye"></i>
                View Full Details
              </button>
            </div>
          </div>
        </>
      )}

      {/* Property Legend */}
      {isViewReady && properties.length > 0 && (
        <div className="property-legend">
          <h4>Property Markers</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-marker sale"></span>
              <span>For Sale</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker rental"></span>
              <span>For Rent</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker offplan"></span>
              <span>Off-Plan</span>
            </div>
          </div>
          <div className="legend-count">
            {properties.length} properties on map
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
