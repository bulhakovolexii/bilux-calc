"use client";

import TreeSelect, { FreeSoloNode } from "mui-tree-select";
import materials from "../model/reference-data/materials";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

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
      } else {
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
    if (this.value.name) {
      return this.value.name;
    }
    return `Густина: ⍴ = ${this.value.density}, кг/м³; Теплопровідність: λ = ${this.value.conductivity}, Вт/(м∙К).`;
  }
}

export default function MaterialTreeSelect({ control }) {
  return (
    <Controller
      name="material"
      control={control}
      rules={{
        required: "Оберіть матеріал",
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <TreeSelect
            disableClearable
            value={value ? new Node(value) : null}
            onChange={(event, newValue) => {
              onChange(newValue ? newValue.value : null);
            }}
            getChildren={(node) =>
              node
                ? node.getChildren()
                : materials.map((type) => new Node(type))
            }
            getParent={(node) => node.getParent()}
            isBranch={(node) => node.isBranch()}
            isOptionEqualToValue={(option, value) => {
              return option instanceof FreeSoloNode
                ? false
                : option.isEqual(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Матеріал"
                variant="filled"
                error={!!error}
                helperText={error?.message || " "}
                inputRef={ref}
                inputProps={{ ...params.inputProps, readOnly: true }}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    cursor: "pointer",
                    input: { cursor: "pointer" },
                  },
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
