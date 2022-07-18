/**
 * Code copied from: https://stackoverflow.com/a/16591175
 */
export const getDateOfISOWeek = (w: number, y: number): Date => {
	const simple = new Date(y, 0, 1 + (w - 1) * 7)
	const dow = simple.getDay()
	const ISOWeekStart = simple
	if (dow <= 4) {
		ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1)
	} else {
		ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay())
	}
	return ISOWeekStart
}
