import materials from "../reference-data/materials";

export default class Layer {
  constructor(inputData) {
    this.type = inputData.type;
    this.subtype = inputData.subtype;
    this.name = inputData.name;
    this.thickness = parseInt(inputData.thickness) / 1000;
    this.density = parseInt(inputData.density);
  }
  conductivity() {
    const material = materials.find((material) => {
      return (
        material.type === this.type &&
        material.subtype === this.subtype &&
        material.name === this.name
      );
    });

    const conductivity = material.variants.find(
      (variant) => variant.density === this.density
    ).conductivity;

    return conductivity;
  }
  thermalResistance() {
    return this.thickness / this.conductivity();
  }
}
