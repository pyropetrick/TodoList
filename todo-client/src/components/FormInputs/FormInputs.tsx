import { Task } from "@/types";
import { STATUS } from "@/utils";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<Task>;
};

export const FormInputs: FC<Props> = ({ register }) => (
  <>
    <label className="flex flex-col gap-1">
      Title
      <input
        {...register("content", { required: true })}
        type="text"
        className="form-input"
      />
    </label>

    <label className="flex flex-col gap-1">
      Status
      <select {...register("status")} className="form-select">
        <option>{STATUS.TODO}</option>
        <option>{STATUS.COMPLETED}</option>
      </select>
    </label>
  </>
);
