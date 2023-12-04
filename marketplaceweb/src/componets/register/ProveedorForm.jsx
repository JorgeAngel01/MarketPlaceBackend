export default function ProveedorForm({register, errors}){
  return(
    <div>
      <label htmlFor="brandName" className="text-slate-500 mb-2 block text-sm">
          Brand's Name:
        </label>
        <input
          type="text"
          {...register("brandName", {
            required: {
              value: true,
              message: "Brand Name is required",
            },
            maxLength: {
              value: 30,
              message: "Input cannot exceed 30 characters",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Your Brand Name"
        />

        {errors.brandName && (
          <span className="text-red-500 text-xs">
            {errors.brandName.message}
          </span>
        )}

        <label htmlFor="description" className="text-slate-500 mb-2 block text-sm">
          Description:
        </label>
        <input
          type="text"
          {...register("description", {
            required: {
              value: true,
              message: "description is required",
            },
            maxLength: {
              value: 30,
              message: "Input cannot exceed 30 characters",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Description"
        />

        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}  
    </div>
  )
}