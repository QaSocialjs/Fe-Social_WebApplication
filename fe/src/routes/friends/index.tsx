import LayoutFriend from "@lib/layouts/layout-friend";
import FriendRequestion from "./FriendRequestion";
import FriendSuggestion from "./FriendSuggestion";

function Friends() {
  return (
    <div className="overflow-y-auto">
      <FriendRequestion />
      <FriendSuggestion />
    </div>
  );
}

export default Friends;
