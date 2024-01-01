import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

interface AuthHeaderProps {
	label: string;

}

export const AuthHeader = ({label}: AuthHeaderProps) => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-4 w-full">
			<h1
				className={cn(
					"text-3xl font-semibold",
					font.className
				)}
			>
				Auth
			</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	)
}

