import { DatePicker, Typography } from "antd";
import moment from "moment";
import { commonProps } from "../../utils/types";
import {RedErrorBelow} from "./BasicComponents";

export const DateInput = ({
  field: { name, value },
  meta,
  setFieldValue,
  ...props
}: commonProps) => {
  const customHandle = (dateObj: moment.Moment) => {


    setFieldValue(name, dateObj);
  };
  return (
    <>
      <Typography>
        <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      </Typography>

      <DatePicker
        name={name}
        //type= 'moment'
        defaultValue={moment('YYYY-MM-DD')}
        value={value}
        onOk={customHandle}
      />
      <RedErrorBelow meta={meta} />
    </>
  );
};


