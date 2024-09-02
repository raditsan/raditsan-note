export const fakePromise = (delayInMs = 3000) => new Promise<void>((resolve, reject) => {
	setTimeout(() => {
		resolve()
	}, delayInMs)
})

