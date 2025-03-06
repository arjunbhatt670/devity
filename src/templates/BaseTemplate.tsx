export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold text-gray-900">
              Next JS App
            </h1>
            <h2 className="text-xl">SSR? ISR? CSR? I just wanted my div to render, man!</h2>
          </div>

          <div className="flex justify-between">
            <nav>
              {props.leftNav}
            </nav>

            <nav className="flex flex-wrap gap-x-5 text-xl">
              {props.rightNav}
            </nav>
          </div>
        </header>

        <main>{props.children}</main>
      </div>
    </div>
  );
};
