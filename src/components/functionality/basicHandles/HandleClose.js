export async function HandleClosePress(navigation) {
    navigation.pop();
};

export async function HandleCloseAllBottomSheets(navigation) {
    navigation.popToTop();
};