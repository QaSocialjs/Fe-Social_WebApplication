import ListSuggest from "./ListSuggest";

function FriendSuggestion() {
  return (
    <div className="w-full p-5">
      <h2 className="font-medium">People you may know</h2>
      <ListSuggest></ListSuggest>
    </div>
  );
}

export default FriendSuggestion;
