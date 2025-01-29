import { useParams } from "react-router-dom";
import JobItemDeals from "./JobItemDeals";

const Wrapper = () =>{
    const {id} = useParams()
    return(
        <JobItemDeals id = {id} />
    )
}
export default Wrapper;