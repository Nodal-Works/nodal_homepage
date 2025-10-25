# Growth of the Metropolitan Region of Buenos Aires through the Use of Satellite Images

## Territorial Analysis Using Satellite Imagery

Since 2010, the **Center for Urban and Housing Policies (CIPUV)**, with the support of the **World Bank** and the **Lincoln Institute of Land Policy (LILP)**, has been acquiring satellite images from various municipalities across Argentina for the years **1990, 2000, and 2010**.  
Currently, CIPUV holds satellite images for more than **100 municipalities** in the country for these reference years.

Using **Geographic Information Systems (GIS)**, these images can be processed to obtain quantitative information on **urban areas** and their **expansion between 1990 and 2010**.

---

## Analysis Methodology

The image processing followed the theory and methodology developed by **Dr. Angel Shlomo**. This approach is divided into two main phases:

### Phase 1: Initial Classification

Each pixel in the satellite images was classified into three categories:

1. **Built-up areas**
2. **Unbuilt or permeable land**
3. **Water**

In this phase, **Landsat 5** images were used, where each pixel represents a surface area of **30 m²**.

![Panel A: Unprocessed satellite image](images/panel_a_raw.png)  
![Panel B: Classified image](images/panel_b_classified.png)  
**Source:** Own elaboration based on CIPUV data.

---

### Phase 2: Contextual Reclassification

Each pixel is reclassified based on its surrounding environment. Neighboring pixels are defined as those within a **walkable distance** (1 km² radius).

- If **50% or more** of neighboring pixels are built-up → **Urban built-up**
- If between **10% and 50%** → **Suburban built-up**
- If **less than 10%** → **Rural built-up**

![Figure 1: Second phase of pixel classification](images/figure1_contextual.png)  
**Source:** Image based on the description from Shlomo’s project.

---

## Classification of Open Spaces

Pixels classified as “open spaces” in the first phase are reclassified as:

- **Urban open spaces:** if 50% of neighboring pixels are built-up.  
- **Captured open land:** if the open area (≤ 2 km²) is completely surrounded by built-up or urban open pixels.  
- **Rural open spaces:** if less than 10% of neighboring pixels are built-up.

The **urbanized area** is composed of all built-up pixels plus captured and urban open land.

![Figure 2: Urban area analysis](images/figure2_urban_area.png)  
**Source:** Own elaboration based on Shlomo’s methodological documents.

---

## Urban Footprint (Mancha Urbana)

The **urban footprint** is defined as the combination of built-up pixels and **open spaces affected by them**.

- **Fringe open spaces:** pixels located within 100 meters of urban or suburban pixels.  
- **Captured pixels:** open spaces ≤ 2 km² entirely surrounded by built-up or fringe pixels.  
- **Rural open spaces:** remaining open pixels.

![Figure 3: Urban footprint analysis](images/figure3_urban_footprint.png)  
**Source:** Own elaboration based on Shlomo’s methodological documents.

---

## Metropolitan Region of Buenos Aires (RMBA)

According to **Decree 656/94**, the **Metropolitan Region of Buenos Aires (RMBA)** is composed of the **City of Buenos Aires (CABA)** and **42 surrounding districts (partidos)**.  
This study focuses on **CABA and 30 municipalities**, where more than **90% of the region’s population** resides, forming a continuous urban fabric.

**Total area:** 613,349 hectares (6,133 km²)

**Included municipalities:** Vicente López, San Isidro, General San Martín, Tres de Febrero, Hurlingham, Ituzaingó, Morón, La Matanza, Lomas de Zamora, Lanús, Quilmes, Almirante Brown, Esteban Echeverría, Ezeiza, Merlo, Moreno, San Miguel, José C. Paz, Malvinas Argentinas, San Fernando, Tigre, Escobar, Pilar, Presidente Perón, Florencio Varela, Berazategui, Avellaneda, Marcos Paz, Cañuelas, General Rodríguez, San Vicente, and the City of Buenos Aires.

![Map 1: Metropolitan Region of Buenos Aires – Study area by zones (coronas)](images/map1_rmba_zones.png)  
**Source:** Own elaboration based on INDEC data.

---

## Image Processing Results

### Built-up Area and Urban Expansion

| Year | Built-up Area (km²) | % of Total Region | Growth (%) |
|------|---------------------|-------------------|-------------|
| 1990 | 1,070               | 17%               | —           |
| 2000 | 1,237               | 20%               | +16%        |
| 2010 | 1,712               | 28%               | +38%        |

Between 1990 and 2010, the urbanized area of the RMBA increased by **60%**, while rural undeveloped land decreased from **4,847 km² to 4,137 km²**.

---

### Distribution of Construction Types

| Year | Urban (%) | Suburban (%) | Rural (%) |
|------|------------|--------------|------------|
| 1990 | 83         | 15           | 1          |
| 2000 | 85         | 14           | 1          |
| 2010 | 85         | 13           | 1          |

---

### Urban Green Spaces

| Year | Green Spaces (km²) | % of Built-up Area |
|------|--------------------|--------------------|
| 1990 | 202                | 19%                |
| 2000 | 225                | 18%                |
| 2010 | 260                | 15%                |

Although the total surface increased, **green urban spaces** fell proportionally from **19% to 15%** relative to the built-up area.

---

## Urban Footprint and Affected Land

| Year | Affected Land (km²) | Growth (%) | % Fringe Area |
|------|----------------------|-------------|----------------|
| 1990 | 555                  | —           | 92%             |
| 2000 | 579                  | +4%         | 92%             |
| 2010 | 830                  | +43%        | 92%             |

Rural land decreased from **4,493 km² in 1990** to **3,567 km² in 2010**.

---

## New Developments

| Period     | New Surface (km²) | Growth (%) | Infill (%) | Extension (%) | Leapfrog (%) |
|-------------|------------------|-------------|-------------|----------------|---------------|
| 1990–2000   | 167              | —           | 34          | 60             | 6             |
| 2000–2010   | 478              | +187%       | 30          | 53             | 17            |

---

## Changes by Metropolitan Zones (Coronas)

| Region      | Total Surface (km²) | % of RMBA Total |
|--------------|--------------------|------------------|
| CABA         | 204                | 3%               |
| 1st Ring     | 759                | 12%              |
| 2nd Ring     | 1,806              | 29%              |
| 3rd Ring     | 3,365              | 55%              |

### Main Findings

- **CABA:** Limited growth; built-up area increased from 83% to 91%.  
- **1st Ring:** Highly consolidated, minor expansion.  
- **2nd Ring:** 61% growth between 2000–2010.  
- **3rd Ring:** 170% growth, surpassing CABA’s built-up area by 2010.

---

### Changes in Construction Types

**Second Ring:**
- Urban: 65% → 82%  
- Suburban: 32% → 16%  
- Rural: 3% → 1%

**Third Ring:**
- Urban: 26% → 43%  
- Suburban: 50% → 45%  
- Rural: 23% → 12%

---

## Spatial Evolution

### Maps of the RMBA Urban Area
![Panel A: Urban area in 1990](images/urban_1990.png)  
![Panel B: Urban area in 2000](images/urban_2000.png)  
![Panel C: Urban area in 2010](images/urban_2010.png)  
**Source:** Own elaboration based on CIPUV satellite image processing.

### Maps of the RMBA Urban Footprint
![Panel A: Urban footprint 1990](images/footprint_1990.png)  
![Panel B: Urban footprint 2000](images/footprint_2000.png)  
![Panel C: Urban footprint 2010](images/footprint_2010.png)  
**Source:** Own elaboration based on CIPUV satellite image processing.

### Maps of New Developments
![Panel A: 1990–2000](images/development_1990_2000.png)  
![Panel B: 2000–2010](images/development_2000_2010.png)  
**Source:** Own elaboration based on CIPUV satellite image processing.
