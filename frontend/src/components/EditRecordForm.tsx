import { useForm } from "react-hook-form";
import {
  Route53Record,
  route53RecordSchema,
} from "@vinaydevs/common-dnsmanager";
import { zodResolver } from "@hookform/resolvers/zod";
import route53RecordTypesWithExample from "../util";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import useUserDnsActions from "../services/useUserDnsActions";

const NewRecordSchema = z.object({
  Name: z.string().min(1, "Name Cannot be Empty"),
  Type: z.enum([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SPF",
    "SRV",
    "TXT",
  ]),
  Multiline: z.string().min(1, "Cannot be Empty"),
});
type NewRecordSchema = z.infer<typeof NewRecordSchema>;

const EditRecordForm = ({
  hostZoneName,
  hostedZoneId,
  defaultValues,
  setFetch,
}: {
  hostZoneName: string;
  hostedZoneId: string;
  defaultValues: NewRecordSchema;
}) => {
  const [recordSets, setRecordSets] = useState<{ Value: string }[]>(
    defaultValues.Multiline.split("\n").map((record) => ({ Value: record }))
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewRecordSchema>({
    resolver: zodResolver(NewRecordSchema),
    defaultValues,
  });

  const [recordType, setRecordType] = useState<string>(defaultValues.Type);
  const userDNSactions = useUserDnsActions();
  const onSubmit = async (data: NewRecordSchema) => {
    const { Name, Type } = data;
    const NewRecordData: Route53Record = {
      Name: `${Name}.${hostZoneName}`,
      Type: Type,
      ResourceRecords: recordSets,
    };
    const { success } = route53RecordSchema.safeParse(NewRecordData);
    if (!success) {
      toast.error("Input Error");
      return;
    }
    await userDNSactions.postRecordset(NewRecordData, hostedZoneId, "update");
    setFetch((prev) => !prev);
    toast.success("Record updated successfully");
  };

  console.log(errors);
  const WatchRecordSetValue = watch("Multiline");

  useEffect(() => {
    const updatedRecordSet = WatchRecordSetValue?.split("\n").map((record) => {
      return { Value: record };
    });
    setRecordSets(updatedRecordSet);
  }, [WatchRecordSetValue]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-bold text-2xl">Edit Record</h1>
      <div>
        <label>Record Name:</label>
        <br />
        <input
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("Name", { required: true })}
          type="text"
          disabled
        />
        <span className=" ml-3">{hostZoneName}</span>
        <br />
        {errors.Name && (
          <span className="text-xm text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label>Record Type:</label>
        <select
          {...register("Type", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setValue("Multiline", "");
            setRecordType(e.target.value);
          }}
        >
          {route53RecordTypesWithExample.map((recordType) => (
            <option key={recordType.value} value={recordType.value}>
              {recordType.value}
            </option>
          ))}
        </select>
        {errors.Type && (
          <span className="text-xm text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label>Record Value:</label>

        <textarea
          {...register("Multiline", { required: "This field is required" })}
          className="border border-gray-300 rounded-md w-full p-2 mt-1"
          rows={5}
          cols={40}
          placeholder={
            route53RecordTypesWithExample.find(
              (type) => type.value === recordType
            )?.placeholder
          }
        />
        <span className="text-xs">
          Enter multiple values on separate lines.
        </span>
        {errors.Multiline && (
          <span className="text-xm text-red-500">This field is required</span>
        )}
      </div>

      <button className="bg-black text-white p-2 w-full rounded" type="submit">
        Update Record
      </button>
    </form>
  );
};

export default EditRecordForm;
