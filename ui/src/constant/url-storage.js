class UrlStorage {
    constructor() {
        this.FACEBOOK_URL = "http://facebook.com";
        this.GITHUB_URL = "https://github.com/Pasit065";
        this.YOUTUBE_URL = "http://youtube.com";
        this.INSTRAGRAM_URL = "http://instragram.com";
        this.MAILCHIMPS_URL = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
    }
}

export default UrlStorage;