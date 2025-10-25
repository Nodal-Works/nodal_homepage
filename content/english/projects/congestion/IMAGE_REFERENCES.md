# Image References for Manual Insertion

## Instructions
Extract the following images from the research paper: 
**"Mapping the spatial distribution of urban traffic congestion.pdf"**

Place all images in the directory: `c:\Users\edgardo\Documents\GitHub\00_Congestion\01_BEYOND2020\project\`

---

## Required Images

### 1. **congestion_hero.png**
- **Location in index.md**: Header/hero section (line ~20)
- **Description**: A compelling visualization showing traffic congestion spatial distribution
- **Suggested source**: Main results figure from the paper showing TTI maps across cities
- **Dimensions**: High-resolution, suitable for header image (suggest 1200-1600px wide)

---

### 2. **study_cities.png**
- **Location in index.md**: "The Challenge" section (line ~25)
- **Description**: Map showing geographic locations of the four study cities across Europe
- **Suggested source**: Figure 1 or study area map from the paper
- **Content should show**: 
  - Lisbon (Portugal)
  - Göteborg (Sweden)
  - Amsterdam (Netherlands)
  - Glasgow (United Kingdom)
- **Dimensions**: ~800-1000px wide

---

### 3. **grid_methodology.png**
- **Location in index.md**: "Research Methodology" section (line ~55)
- **Description**: Illustration of the spatial grid overlay methodology
- **Suggested source**: Methodology figure showing how grid cells partition urban area
- **Content should show**:
  - Grid overlay on city
  - Centroid points
  - OD matrix concept (optional)
- **Dimensions**: ~800px wide

---

### 4. **tti_maps.png**
- **Location in index.md**: "Results & Findings" → "Spatial Congestion Patterns" (line ~117)
- **Description**: Choropleth maps showing Travel Time Index (TTI) spatial distribution
- **Suggested source**: Main results figure from paper (likely Figure 3 or 4)
- **Content should show**:
  - TTI values across grid cells
  - Color-coded congestion intensity
  - Ideally multiple cities for comparison
- **Dimensions**: Large, high-quality (1000-1400px wide)

---

### 5. **city_comparison.png**
- **Location in index.md**: "Results & Findings" → "Comparative City Analysis" (line ~132)
- **Description**: Comparative statistics or distributions showing TTI across the four cities
- **Suggested source**: Figure showing statistical comparisons (box plots, violin plots, or bar charts)
- **Content should show**:
  - Comparative metrics for Lisbon, Amsterdam, Göteborg, Glasgow
  - Could be box plots, histograms, or summary statistics
- **Dimensions**: ~900px wide

---

### 6. **time_differences.png**
- **Location in index.md**: "Results & Findings" → "Temporal Variability" (line ~158)
- **Description**: Visualization showing distribution of congestion-induced travel time delays
- **Suggested source**: Scatter plots or histograms from results section
- **Content should show**:
  - Difference between pessimistic and optimistic travel times
  - Could be scatter plot (distance vs. time difference) or histogram
  - Relationship between trip distance and congestion impact
- **Dimensions**: ~700-900px wide

---

## Image Placement Summary

| Image File | Section | Figure Number | Alt Text Summary |
|------------|---------|---------------|------------------|
| `congestion_hero.png` | Header | - | Traffic congestion spatial visualization |
| `study_cities.png` | The Challenge | Figure 1 | Geographic locations of four study cities |
| `grid_methodology.png` | Methodology | Figure 2 | Spatial grid overlay methodology |
| `tti_maps.png` | Results (Spatial Patterns) | Figure 3 | TTI spatial distribution across cities |
| `city_comparison.png` | Results (Comparative) | Figure 4 | Comparative congestion metrics |
| `time_differences.png` | Results (Temporal) | Figure 5 | Distribution of travel time delays |

---

## Technical Specifications

- **Format**: PNG preferred (better for charts/maps)
- **Resolution**: 150-300 DPI for print quality
- **Color**: Full color recommended
- **Compression**: Moderate (maintain clarity while keeping file sizes reasonable)

---

## Notes

- All images use inline HTML `<div>` and `<img>` tags for precise centering and sizing
- Each image has descriptive alt text for accessibility
- Figure captions are formatted in italics using `<em>` tags
- Width percentages are set to ensure responsive display (70-90% of container width)

---

## Current Status

- [ ] congestion_hero.png
- [ ] study_cities.png  
- [ ] grid_methodology.png
- [ ] tti_maps.png
- [ ] city_comparison.png
- [ ] time_differences.png

---

**After extracting images from the paper PDF**, check all boxes above and verify that:
1. All image files are in the correct directory
2. File names match exactly (case-sensitive)
3. Images render correctly in the markdown preview
4. Captions accurately describe the content
