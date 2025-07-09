export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-2 py-3 px-16 w-full border border-transparent border-b-border/30">
        <div className="text-lg font-bold w-full items-start">개발자들</div>
        <div className="flex flex-col gap-2 px-3">
          <p>mumu.park</p>
          <p>morgan.koo</p>
          <p>emily.kim</p>
          <p>dain.son</p>
          <p>ellina.kim</p>
          <p>jun.jo</p>
        </div>
      </div>
      <div className="flex justify-center w-full mt-4 mb-auto">
        <a href="https://www.buymeacoffee.com/ssammu" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="h-10 w-auto"
          />
        </a>
      </div>
    </>
  );
}
