"use client";

import TreeSelect, { FreeSoloNode } from "mui-tree-select";
import materials from "@/model/reference-data/materials";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Node from "@/utils/TreeNode";

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
