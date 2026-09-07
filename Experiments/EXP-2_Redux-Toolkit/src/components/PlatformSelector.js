import { useDispatch, useSelector } from "react-redux";
import { setPlatform } from "../features/platforms/platformsSlice";

export default function PlatformSelector() {

  const dispatch = useDispatch();

  const platform = useSelector(
    (state)=>state.platforms.selectedPlatform
  );

  return (

    <div className="card">

      <h3>Select Platform</h3>

      <select
      value={platform}
      onChange={(e)=>dispatch(setPlatform(e.target.value))}
      >

        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
        <option>Twitter</option>

      </select>

    </div>

  );

}