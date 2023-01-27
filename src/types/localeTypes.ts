export interface translationsType {
    [key: string]: localeType;
}

export interface localeType {
	locale: string;
	name: string;
	nativeName: string;
	
	meta: metaType;
	header: headerType;
	footer: footerType;

	homePage: homePageType;
	loginPage: loginPageType;
	applicationsPage: applicationsPageType;
	applicationpage: applicationpageType;
}

export interface metaType {
	title: string;
	description: string;
	content: string;
}

export interface headerType {
	companyName: string;
	companySlogan: string;
	login: string;
	register: string;
}

export interface footerType {
	companyName: string;
	companySlogan: string;
	copyright: string;
}

export interface homePageType {
	title: string;
	cardTitle: string;
	cardDescription: string;
}

export interface loginPageType {
	loginHere: string;
}

export interface applicationsPageType {
	title: string;
	description: string;
	filters: string;
}

export interface applicationpageType {
	title: string;
	description: string;
}