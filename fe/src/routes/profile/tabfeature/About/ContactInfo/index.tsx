import BasicInfor from "./BasicInfor";

function ContactAndInfo() {
  return (
    <div className="px-6 py-2 w-full flex flex-col">
      <h4 className="text-base font-semibold">Contact info</h4>

      <h4 className="text-base font-semibold">Base info</h4>
      <BasicInfor />
    </div>
  );
}

export default ContactAndInfo;
