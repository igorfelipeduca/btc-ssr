async function getData() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin", {
    next: { revalidate: 60, tags: ["BTC"] },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function InfoPage({
  params,
}: {
  params: { locale: string };
}) {
  const data = await getData();

  const locale = params.locale;
  const isLocaleAvailable =
    data.description[locale] !== undefined ? true : false;

  const locales = Object.keys(data.description);

  if (!isLocaleAvailable) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <h1 className="text-center text-2xl font-bold text-zinc-400">
            The locale {locale.toUpperCase()} is not available
          </h1>

          <h3 className={"text-lg text-zinc-500 font-medium"}>
            Available locales:
          </h3>

          <div className="mt-8">
            <div className="grid grid-cols-4 gap-4">
              {locales.map((locale: string, index: number) => (
                <div
                  className="py-2 px-4 rounded-full bg-zinc-900 border border-zinc-700 text-center w-full text-sm text-zinc-300"
                  key={index}
                >
                  {locale}
                </div>
              ))}
            </div>
          </div>

          <h3 className={"text-lg text-zinc-500 font-medium mt-8"}>
            Please, select one of the available locales and go to:{" "}
            <span className="py-2 px-4 rounded-lg bg-zinc-900 border border-zinc-700 text-lg">
              /{"{locale}"}
            </span>
          </h3>
        </div>
      </div>
    );
  }

  const localeDescription = data.description[locale];
  const lastUpdated = new Date(data.market_data.last_updated);

  return (
    <div className="flex justify-center">
      <main className="py-16 lg:py-32 px-8 w-full max-w-5xl">
        <div className="flex flex-col">
          <div className="w-full flex-col lg:flex space-y-4 lg:space-y-0 lg:flex-row lg:items-start lg:justify-between">
            <div className="text-left">
              <h1 className="text-2xl text-zinc-50">
                ${data.symbol.toUpperCase()} - Understanding Bitcoin
              </h1>
              <p className="text-lg text-zinc-400">
                This website is using server-side rendering.
              </p>
            </div>

            <div className="px-4 py-2 rounded-lg bg-zinc-900 border-zinc-500">
              This page revalidates every 60 seconds
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {data.categories.map((tag: any, index: number) => (
              <div
                className="py-2 px-4 rounded-full bg-zinc-900 border border-zinc-700 text-center w-full text-sm text-zinc-300"
                key={index}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="mt-8">
            {localeDescription.length > 0 ? (
              <div
                className="text-md text-left text-zinc-300 mt-8"
                dangerouslySetInnerHTML={{ __html: localeDescription }}
              />
            ) : (
              <div className="flex w-full justify-center">
                <div className="text-md text-left text-zinc-600 mt-8">
                  No description available for this locale
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 space-y-8">
          <h1 className="text-2xl text-zinc-300 flex items-center gap-x-2">
            Hashing algorithm:{" "}
            <span className="w-fit py-2 px-4 text-center rounded-lg bg-zinc-900 border border-zinc-700 text-lg">
              {data.hashing_algorithm}
            </span>
          </h1>

          <h1 className="text-2xl text-zinc-300 flex items-center gap-x-2">
            Current price:{" "}
            <span className="w-fit py-2 px-4 text-center rounded-lg bg-zinc-900 border border-zinc-700 text-lg">
              {data.market_data.current_price.usd.toLocaleString()} USD
            </span>
          </h1>

          <h1 className="text-2xl text-zinc-300 flex items-center gap-x-2">
            Last updated:{" "}
            <span className="w-fit py-2 px-4 text-center rounded-lg bg-zinc-900 border border-zinc-700 text-lg">
              {lastUpdated.toLocaleString()}
            </span>
          </h1>
        </div>

        <div className="mt-16">
          <h1 className="text-2xl text-zinc-300 flex items-center gap-x-2">
            Tickers
          </h1>

          <h3>Click on the ticker to go to the trading page</h3>

          <div className="mt-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.tickers.map((ticker: any, index: number) => (
                <a
                  className="py-2 px-4 rounded-lg bg-zinc-900 border border-zinc-700 text-center w-full text-sm text-zinc-300 transition-all duration-150 hover:bg-zinc-800 cursor-default"
                  key={index}
                  href={`https://www.coingecko.com/en/coins/${ticker.coin_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ticker.market.name} ({ticker.market.identifier})
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full border-t border-zinc-800 pt-4">
          <p className="text-center text-zinc-500 text-sm">
            Created by{" "}
            <a
              href="https://github.com/igorfelipeduca"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-zinc-400"
            >
              Igor Duca
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
