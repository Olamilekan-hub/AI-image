const Button = ( props ) => {
  return (
          <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190c]">
                    <div className="absolute inset-0">
                              <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient"></div>
                              <div className="rounded-lg border absolute inset-0 border-white/40 [masl-image: linear-gradient]"></div>
                              <div className="absolute inset-0 shadow-[0_0_10px-rgb(140,69,255,.7)_inset] rounded-lg"></div>
                    </div>
                    <span>{props.children}</span>
          </button>
  )
}
export default Button