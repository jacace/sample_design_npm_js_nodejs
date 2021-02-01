class EventRepository {

	constructor(initData) {
		this.initData = initData;
	}

	sendEvent(destAddress, eventData) {
		//Todo: send message to coreography
	}

	getTopics(eventType) {
		var dict = {};
		var destTopics = ["SampleKey"];
		dict["SampleKey"] = "SampleValue";
		return dict;
	}


}