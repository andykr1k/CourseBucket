import { Grid } from "react-loader-spinner"

function SmallLoader() {


    return (
      <div className="grid place-items-center h-40">
        <Grid
        height="80"
        width="80"
        color="#2A4DD0"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
      </div>
    )
}

export default SmallLoader
