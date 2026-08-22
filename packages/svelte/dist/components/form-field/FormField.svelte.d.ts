import type { Snippet } from "svelte";
interface Props {
    children: Snippet;
    error?: string;
}
declare const FormField: import("svelte").Component<Props, {}, "">;
type FormField = ReturnType<typeof FormField>;
export default FormField;
