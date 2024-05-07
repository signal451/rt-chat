import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="md:py-10 md:max-w-xl h-screen mx-auto">
      <div className="h-full border rounded-md">
        <div className="flex p-5 justify-between border-b-[1px]">
          <div className="flex-col">
          <h1 className="font-semibold text-lg"> Daily Chat </h1>
          <div className="flex justify-start items-center">
            <div className="w-2 h-2 bg-green-700 rounded-full mr-1">
            </div>
            <p className="text-sm"> 2 onlines</p>
          </div>

          </div>
          <Button className="mt-1">Login</Button>
        </div>
      </div>
    </main>
  );
}
