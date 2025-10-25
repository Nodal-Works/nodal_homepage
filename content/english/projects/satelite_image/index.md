---
title: "Growth of the Metropolitan Region of Buenos Aires through Satellite Image Analysis"
date: 2020-05-10
image: "satellite_hero.png"
description: "A comprehensive territorial analysis using satellite imagery and GIS to quantify urban expansion patterns in the Buenos Aires Metropolitan Region from 1990-2010"
category: "Urban Analytics & Satellite Remote Sensing"
---

## The Challenge

Understanding urban growth patterns is fundamental for sustainable metropolitan development, yet traditional analysis methods often lack the temporal depth and spatial precision needed for comprehensive territorial planning. The rapid expansion of Latin American cities presents unique challenges for urban planners who require detailed quantitative data on development patterns, green space preservation, and infrastructure demands.

The **Metropolitan Region of Buenos Aires (RMBA)** exemplifies these challenges as one of South America's largest urban agglomerations. With over **13 million inhabitants** spread across **42 municipalities**, understanding its growth dynamics requires sophisticated analytical approaches that can capture both the scale and complexity of metropolitan expansion.

The fundamental research questions driving this investigation were: **How has urban development evolved spatially in the Buenos Aires Metropolitan Region? What patterns of growth—infill, extension, or leapfrog development—have characterized different metropolitan zones? How have green spaces and rural lands been affected by urban expansion between 1990 and 2010?**

This research addresses these gaps through a comprehensive satellite imagery analysis framework, providing quantitative insights into **20 years of metropolitan growth** using advanced **Geographic Information Systems (GIS)** and **remote sensing methodologies**.

---

## Research Methodology

### Spatial Grid Framework

We implemented a systematic grid-based approach to partition each urban area into standardized spatial units. For each city, we:

1. **Defined urban study boundaries** using official European urban morphological zones
2. **Generated systematic grid cells** (1km² for Lisbon using ETRS89 LAEA projection; varying sizes for other cities)
3. **Computed grid centroids** as representative points for origin-destination analysis
4. **Created comprehensive OD matrices** with all possible grid-to-grid combinations


<div style="text-align: center;">
<img src="GBG.png" width="50%" alt="Example of spatial grid overlay on urban area" style="display: block; margin: 0 auto;">
<p><em>Figure 1: Systematic grid-based spatial partitioning methodology applied to urban study area</em></p>
</div>

### Travel Time Data Collection

We employed the **Google Distance Matrix API** to collect empirical travel time data under varying traffic conditions:

- **Traffic Scenarios**: Three distinct traffic models were queried:
  - **Pessimistic scenario**: Morning rush hour (8:30 AM on Wednesday, March 15, 2018) - captures peak congestion
  - **Best guess scenario**: Current traffic conditions - represents typical conditions
  - **Optimistic scenario**: Free-flow conditions (4:00 AM on Sunday, July 15, 2018) - minimal traffic baseline

- **OD Matrix Queries**: For each grid-to-grid pair, we collected:
  - Network distance (meters)
  - Travel duration without traffic (seconds)
  - Travel duration in traffic (seconds)
  - Implied average speed

### Congestion Index Calculation

We computed the **Travel Time Index (TTI)** as our primary congestion metric:

<div style="text-align: center; font-size: 1.2em; margin: 1.5em 0;">
<strong>TTI = t<sub>congested</sub> / t<sub>free-flow</sub></strong>
</div>

Where:
- **t<sub>congested</sub>** = travel time during peak congestion (pessimistic scenario)
- **t<sub>free-flow</sub>** = travel time under optimal conditions (optimistic scenario)

A TTI of 1.5 indicates that a trip takes 50% longer during congestion compared to free-flow conditions.

Below is the step by step method.

<div style="text-align: center;">
<img src="method.png" width="90%" alt="Methodology followed in the research" style="display: block; margin: 0 auto;">
<p><em>Figure 2: Spatial distribution of Travel Time Index (TTI) showing congestion hotspots and patterns across urban areas</em></p>
</div>

### Technical Architecture

```text
      ┌─────────────────────────────────────────────────────────────┐
      │                    DATA PIPELINE                            │
      ├─────────────────────────────────────────────────────────────┤
      │                                                             │
      │  Spatial Grid       Google Distance      Congestion         │
      │  Generation    -->  Matrix API      -->  Index              │
      │  (R/rgdal)          Queries              Calculation        │
      │                     (XML parsing)        (TTI, speed)       │
      │                                                             │
      └─────────────────────────────────────────────────────────────┘

      ┌─────────────────────────────────────────────────────────────┐
      │                  ANALYTICAL WORKFLOW                        │
      ├─────────────────────────────────────────────────────────────┤
      │                                                             │
      │  1. load_n_centroid()    - Create spatial grid centroids    │
      │  2. create_mat_od()      - Generate OD matrix               │
      │  3. data_build()         - Query Google API (3 scenarios)   │
      │  4. clean_1st()          - Data cleaning & speed calc       │
      │  5. aggregation()        - Spatial aggregation by origin    │ 
      │  6. aggrergate_n_merge() - Merge with spatial geometries    │
      │  7. end_of_aggregation() - Compute final TTI metrics        │
      │                                                             │
      └─────────────────────────────────────────────────────────────┘
```

**Key Implementation Components:**

- **R Scripts**: `Congestion_Index.R` - Core analytical functions
- **Execution Pipeline**: `Excecution.R` - City-specific processing workflows  
- **Visualization**: `graphs.R`, `tables.R` - Publication-quality outputs
- **Geospatial Libraries**: rgdal, sp, sf, mapview, leaflet
- **Data Processing**: dplyr, tidyr for data manipulation

---

## Results & Findings

### Spatial Congestion Patterns

Our analysis revealed distinct spatial heterogeneity in traffic congestion across all four cities:

<div style="text-align: center;">
<img src="TTI_ALL.png" width="90%" alt="Travel Time Index spatial distribution across study cities" style="display: block; margin: 0 auto;">
<p><em>Figure 3: Spatial distribution of Travel Time Index (TTI) showing congestion hotspots and patterns across urban areas</em></p>
</div>

**Key Spatial Findings:**

1. **City Centers**: Consistently exhibited highest TTI values (>1.5), indicating severe congestion during peak periods
2. **Suburban Areas**: Generally showed lower congestion (TTI 1.1-1.3) with better free-flow conditions
3. **Radial Patterns**: Congestion intensified along major arterial corridors connecting periphery to center
4. **Hotspot Clustering**: Specific neighborhoods showed persistent congestion regardless of traffic scenario

### Comparative City Analysis


<div style="text-align: center;">
<img src="compare_tti.png" width="85%" alt="Comparative congestion metrics across the four cities" style="display: block; margin: 0 auto;">
<p><em>Figure 4: Comparative analysis of congestion intensity and spatial extent across Lisbon, Göteborg, Amsterdam, and Glasgow</em></p>
</div>

**Inter-City Comparisons:**

- **Lisbon**: Exhibited highest average TTI with extensive congestion coverage
- **Amsterdam**: Moderate congestion but highly concentrated in canal district
- **Göteborg**: Lower overall congestion with localized bottlenecks
- **Glasgow**: Variable patterns with corridor-specific congestion

### Temporal Variability

Analysis of the three traffic scenarios revealed:

<div style="text-align: center; font-size: 1.2em; margin: 1.5em 0;">
<strong>Δt = t<sub>pessimistic</sub> - t<sub>optimistic</sub></strong>
</div>

**Average Time Differences (minutes):**
- Short trips (<5km): +8-12 minutes during congestion
- Medium trips (5-15km): +15-25 minutes during congestion  
- Long trips (>15km): +30-45 minutes during congestion


<div style="text-align: center;">
<img src="density.png" width="75%" alt="Distribution of congestion-induced travel time delays" style="display: block; margin: 0 auto;">
<p><em>Figure 5: Distribution of additional travel time during peak congestion compared to free-flow conditions</em></p>
</div>

### Speed Reduction Analysis

Average travel speeds showed significant reductions during congested periods:

- **Free-flow conditions**: 40-65 km/h (depending on road network)
- **Peak congestion**: 15-30 km/h  
- **Speed reduction**: 50-70% during rush hours

---

## Technical Innovation

### Scalable Geospatial Framework

We developed a modular R-based analytical pipeline that:

- **Handles large-scale OD matrices**: Efficiently processes tens of thousands of origin-destination pairs
- **Integrates multiple APIs**: Google Distance Matrix (legacy) with TomTom migration path
- **Supports multiple cities**: Parameterized functions adapt to different coordinate systems and grid sizes
- **Produces publication-ready outputs**: Automated generation of maps, charts, and statistical summaries

### Data Quality & Validation

- **Error handling**: Robust try-catch blocks for API failures
- **Data cleaning**: Removal of invalid routes and zero-distance pairs
- **Outlier detection**: Statistical filtering of anomalous travel times
- **Cross-validation**: Comparison with ground-truth traffic data where available

### Visualization Pipeline

The project implements sophisticated visualization capabilities:

```r
# Automated map generation for all metrics
export_maps_n_graphs(city_data, 
                     city_name = 'Lisbon',
                     city_best, 
                     city_worst)

# Interactive leaflet maps with custom color schemes
mapview(lisbon, zcol = "tti")
```

Generates:
- **Choropleth maps**: TTI, travel time differences, speed reductions
- **Distribution plots**: Histograms and density curves for congestion metrics
- **Scatter visualizations**: Distance vs. travel time relationships
- **Comparative charts**: Multi-city statistical comparisons

---

## Research Impact

### Academic Contributions

This research demonstrates a **replicable methodology for fine-grained urban congestion analysis** that can be applied to any city with road network data. The spatial grid approach enables:

- **Neighborhood-level insights**: Beyond traditional corridor or city-wide metrics
- **Comparative urban analytics**: Standardized framework for cross-city studies
- **Policy-relevant evidence**: Spatially explicit data for targeted interventions

### Applications for Urban Planning

**Transportation Planners** can use these methods to:
- Identify specific zones requiring congestion mitigation
- Evaluate the spatial extent of infrastructure improvements
- Prioritize public transit investments in high-congestion areas
- Assess equity implications of congestion burdens across neighborhoods

**Policy Makers** gain:
- Evidence-based justification for congestion pricing zones
- Spatial targeting for intelligent transportation systems
- Data-driven evaluation of urban development impacts on traffic

### Methodological Advances

- **Open-source implementation**: All code available for reproduction and extension
- **API-agnostic design**: Adaptable to different routing service providers (Google, TomTom, HERE, etc.)
- **Modular architecture**: Individual components can be modified or replaced
- **Scalability**: Framework tested on cities ranging from 500,000 to 3+ million inhabitants

### Real-World Application: Latin America Transportation Investment Analysis

The methodology developed in this research was successfully adapted and deployed for **strategic transportation investment analysis** in collaboration with the **Inter-American Development Bank (IDB)**. This application demonstrated the framework's versatility beyond urban congestion mapping:

**Strategic Adaptation for Regional Analysis:**
- **Scale Transition**: From city-grid analysis to country/regional-level strategic planning
- **Point Selection**: Instead of systematic grid centroids, **strategic logistic points** were selected across national transportation networks
- **Investment Focus**: Analysis targeted potential transportation infrastructure investments with regional economic impact
- **Multi-Modal Integration**: Expanded beyond road networks to include ports, airports, and major freight corridors

**Methodological Extensions:**
- **Strategic Node Identification**: Key logistics hubs, border crossings, economic centers, and infrastructure bottlenecks
- **Regional Connectivity Analysis**: Inter-city and cross-border transportation efficiency assessment
- **Investment Prioritization**: Travel time improvements translated into economic development potential
- **Policy Integration**: Alignment with national transportation master plans and regional development strategies

This application validates the framework's **adaptability from neighborhood-scale urban analysis to national-scale strategic planning**, demonstrating its value for both detailed city planning and macro-economic transportation investment decisions.



**Technology Stack:**
- **R (4.x)** - Statistical computing and geospatial analysis
- **Key Libraries**: 
  - Spatial: `rgdal`, `sp`, `sf`, `maptools`, `raster`
  - Visualization: `ggplot2`, `mapview`, `leaflet`, `tmap`
  - Data: `dplyr`, `tidyr`, `tidyverse`
  - API Integration: `XML`, `RCurl`

**Data Sources:**
- Google Distance Matrix API (historical data collection)
- TomTom Routing API (updated implementation)
- European Urban Morphological Zones (EEA)
- National grid systems (ETRS89 LAEA for Portugal, local projections for others)

---

## Future Directions

### Real-Time Congestion Monitoring

Extension to continuous monitoring systems using:
- Streaming API integration
- Temporal trend analysis (hourly, daily, seasonal patterns)
- Predictive modeling for congestion forecasting

### Multi-Modal Analysis

Expand beyond private vehicles to include:
- Public transit travel times
- Bicycle routing and infrastructure
- Pedestrian accessibility metrics
- Comparative mode choice implications

### Environmental Integration

Link congestion patterns with:
- Air quality sensor data
- Noise pollution measurements
- Carbon emissions estimates
- Urban heat island effects

---

**Research Approach**: Geospatial analytics • API-driven data collection • Reproducible science
**Technologies**: R • Spatial analysis • Interactive visualization • Statistical modeling
**Project Status**: Research outputs published | Methodology documented | Code available

**Interested in urban analytics, transportation research, or geospatial data science?** This project demonstrates how open-source tools and API integration can produce high-quality research insights for evidence-based urban planning.
