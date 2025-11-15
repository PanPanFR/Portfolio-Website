import { useContext } from "react";
import { DataContent } from "./DataContext";

export function useData() {
	const context = useContext(DataContent);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
