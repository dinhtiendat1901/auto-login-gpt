import checkWorkspaceIsLimited from "./checkWorkspaceIsLimited";

export default async function checkMessageIsLimited(): Promise<boolean> {
    if (await checkWorkspaceIsLimited(0)) {
        if (await checkWorkspaceIsLimited(1)) return true;
    }
    return false;
}