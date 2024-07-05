import materials from "../model/reference-data/materials";

class Node {
  constructor(value) {
    this.value = value;
  }
  getParent() {
    const parent = (() => {
      if ("subtypes" in this.value) {
        return null;
      } else if ("names" in this.value) {
        return (
          materials.find(({ subtypes }) =>
            subtypes.some(({ id }) => id === this.value.id)
          ) || null
        );
      } else if ("variants" in this.value) {
        for (const { subtypes } of materials) {
          for (const { names } of subtypes) {
            const name = names.find(({ variants }) =>
              variants.some(({ id }) => id === this.value.id)
            );
            if (name) {
              return name;
            }
          }
        }
        return null;
      }
      {
        for (const { subtypes } of materials) {
          const subtype = subtypes.find(({ names }) =>
            names.some(({ id }) => id === this.value.id)
          );
          if (subtype) {
            return subtype;
          }
        }
        return null;
      }
    })();
    return parent ? new Node(parent) : parent;
  }
  getChildren() {
    if ("subtypes" in this.value) {
      return this.value.subtypes.map((subtype) => new Node(subtype));
    } else if ("names" in this.value) {
      return this.value.names.map((name) => new Node(name));
    } else if ("variants" in this.value) {
      return this.value.variants.map((variant) => new Node(variant));
    } else {
      return null;
    }
  }
  isBranch() {
    return (
      "subtypes" in this.value ||
      "names" in this.value ||
      "variants" in this.value
    );
  }
  isEqual(to) {
    return to.value.id === this.value.id;
  }
  toString() {
    if (
      "subtypes" in this.value ||
      "names" in this.value ||
      "variants" in this.value
    ) {
      return this.value.name;
    } else {
      return `Густина: ${this.value.density}; Теплопровідність: ${this.value.conductivity}.`;
    }
  }
}

export default function MaterialTreeSelect() {
  return <></>;
}
