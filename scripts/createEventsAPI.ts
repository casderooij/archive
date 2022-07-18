import * as fs from 'fs'
import { getISODay, isSameISOWeek, lastDayOfISOWeek } from 'date-fns'
import { getDateOfISOWeek } from '../src/utils/date'

const CWD = process.cwd()
const filePath = 'src/routes/api/events'
const weeksPerFile = 6

type Repo = { id: number; name: string }

type EventBlock = {
	repo: Repo
	days: number[]
}

type SingleEvent = {
	repo: Repo
	day: number
}

type Week = {
	id: string
	events: Event[]
}

type Events = {
	num_of_weeks: number
	weeks: Week[]
}

type APIResponse = {
	type: string
	repo: {
		id: number
		name: string
		url: string
	}
	created_at: string
}

const createEventsWeek = async () => {
	let { lastEventsData, lastDate } = readLastEventsFile()

	const data = await fetchGithubEvents()

	const newEvents = parseEvents(data, lastDate)
	console.log(newEvents)

	// check numofweeks in lastEventsFile
	// writeEvents(file, newEvents)
}

const fetchGithubEvents = async (page = 1): Promise<any> => {
	const eventsUrl = `https://api.github.com/users/casderooij/events?page=${page}`
	const response = await fetch(eventsUrl)
	return await response.json()
}

const readLastEventsFile = () => {
	const file = fs.readFileSync(`${CWD}/${filePath}/1.json`, 'utf-8')
	const data = JSON.parse(file) as Events
	const lastWeekId = data.weeks[0].id.split('-')

	const ISOWeekDate = getDateOfISOWeek(parseInt(lastWeekId[0]), parseInt(lastWeekId[1]))
	const lastDate = lastDayOfISOWeek(ISOWeekDate)

	// const lastDayOfWeek = new Date(new Date().setDate(dateOfWeek.getDate() + 7))
	return { lastEventsData: data, lastDate }
}

const parseEvents = (data: APIResponse[], lastDate: Date): EventBlock[] => {
	const whitelistEvents = ['PushEvent']
	const blacklistRepos = ['casderooij/vscode-cssvar']

	const eventArray: SingleEvent[] = []
	data.forEach((e) => {
		if (!isSameISOWeek(lastDate, new Date(e.created_at))) return
		if (whitelistEvents.includes(e.type) === false) return
		if (blacklistRepos.includes(e.repo.name)) return

		eventArray.push({
			repo: { id: e.repo.id, name: e.repo.name },
			day: getISODay(new Date(e.created_at))
		})
	})

	const makeEventBlocks = (
		eventArray: SingleEvent[],
		index = 0,
		eventBlocks: EventBlock[] = []
	): EventBlock[] => {
		if (index === eventArray.length - 1) return eventBlocks

		const event = eventArray[index]

		if (eventBlocks.some((i) => i.repo.id === event.repo.id)) {
			// Repo is in eventBlocks, check if they have same day
			if (eventBlocks.some((i) => i.days.some((d) => d === event.day))) {
				// has repo with same day
				makeEventBlocks(eventArray, index++, eventBlocks)
			} else {
				// check if event.day is 1 less than found blocks with same repo
				const sameRepoBlocksWithOneDayDiff = eventBlocks
					.filter((i) => i.repo.id === event.repo.id)
					.find((i) => i.days[0] - event.day === 1)
				if (sameRepoBlocksWithOneDayDiff) {
					makeEventBlocks(eventArray, index++, [
						...eventBlocks,
						{
							...sameRepoBlocksWithOneDayDiff,
							days: [event.day, ...sameRepoBlocksWithOneDayDiff.days]
						}
					])
				} else {
					makeEventBlocks(eventArray, index++, [
						{ repo: { ...event.repo }, days: [event.day] },
						...eventBlocks
					])
				}
			}
		} else {
			// Repo is not in eventBlocks, make new block inside eventBlocks
			makeEventBlocks(eventArray, index++, [
				...eventBlocks,
				{ repo: { ...event.repo }, days: [event.day] }
			])
		}

		return eventBlocks
	}

	const eventBlocks = makeEventBlocks(eventArray)
	return eventBlocks
}

const writeEvents = (file, events: EventBlock[]) => {}

createEventsWeek()

const events = [
	{
		repo: [514839548, 'archive'],
		created_at: '2022-07-17T17:11:15Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T19:54:58Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T19:47:03Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T19:47:03Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T19:47:03Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T14:03:33Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T13:23:35Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T13:17:57Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T10:53:15Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T10:52:26Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-15T10:24:32Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-14T17:59:37Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-14T16:56:25Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-14T13:08:15Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-14T09:59:44Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-13T13:14:33Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-13T12:14:49Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-12T18:49:50Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-12T18:47:45Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T21:15:38Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T20:45:53Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T19:16:24Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T19:15:55Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T12:19:52Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T11:12:19Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T09:39:47Z'
	},
	{
		repo: [509850465, 'portfolio-v4'],
		created_at: '2022-07-11T07:58:52Z'
	}
]
