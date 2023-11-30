export default function RestauranteForm({register, errors}){
  return(
    <div>
      <label htmlFor="latitude" className="text-slate-500 mb-2 block text-sm">
          Latitude:
        </label>
        <input
          type="text"
          {...register("latitude", {
            required: {
              value: true,
              message: "latitude is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Your Restaurant Latitude"
        />

        {errors.latitude && (
          <span className="text-red-500 text-xs">
            {errors.latitude.message}
          </span>
        )}

        <label htmlFor="longitude" className="text-slate-500 mb-2 block text-sm">
          Longitude:
        </label>
        <input
          type="text"
          {...register("longitude", {
            required: {
              value: true,
              message: "longitude is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Your Restuarant Longitude"
        />

        {errors.longitude && (
          <span className="text-red-500 text-xs">
            {errors.longitude.message}
          </span>
        )}
    </div>
  )
}