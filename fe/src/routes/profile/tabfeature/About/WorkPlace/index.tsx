import Work from "./Work";

function WorkPlace() {
  return (
    <div className="px-6 py-2 w-full flex flex-col">
      <h4 className="text-base font-semibold">Work</h4>
      <Work />
      <h4 className="text-base font-semibold">University</h4>
      <h4 className="text-base font-semibold">High School</h4>
    </div>
  );
}

export default WorkPlace;
