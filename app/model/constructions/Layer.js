import materials from "../reference-data/materials";

export default class Layer {
  constructor(inputData) {
    this.thickness = inputData.thickness;
    this.type = inputData.type;
    this.subtype = inputData.subtype;
    this.name = inputData.name;
    this.density = inputData.density;
  }
  conductivity() {
    return materials
      .find((material) => {
        return (
          material.type === this.type &&
          material.subtype === this.subtype &&
          material.name === this.name
        );
      })
      .variants.find((variant) => variant.density === this.density)
      .conductivity;
  }
  R() {
    return this.thickness / this.conductivity();
  }
}
