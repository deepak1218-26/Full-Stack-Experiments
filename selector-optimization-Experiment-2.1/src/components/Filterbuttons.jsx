import { useDispatch, useSelector } from "react-redux";
import { changePlatform } from "../features/postsSlice";

const platforms = [
  "All",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter",
];

function FilterButtons() {
  const dispatch = useDispatch();

  const selectedPlatform = useSelector(
    (state) => state.posts.selectedPlatform
  );

  return (
    <div className="buttons">
      {platforms.map((platform) => (
        <button
          key={platform}
          className={
            selectedPlatform === platform
              ? "active-btn"
              : "normal-btn"
          }
          onClick={() => dispatch(changePlatform(platform))}
        >
          {platform}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;