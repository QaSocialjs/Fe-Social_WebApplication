import FormInputPost from "./FormInputPost";
import IntroInfo from "./IntroInfo";

function Post() {
  return (
    <div className="h-fit min-h-[50vh] w-[70vw] mb-12 grid grid-cols-[2fr_3fr] gap-2">
      <IntroInfo />
      <FormInputPost />
    </div>
  );
}

export default Post;
