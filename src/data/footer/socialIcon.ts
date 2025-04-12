export class SocialIconData {
    id: number;
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
    youtubeLink: string;
    status: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.facebookLink = data.facebook_link || "";
        this.instagramLink = data.instagram_link || "";
        this.twitterLink = data.twitter_link || "";
        this.youtubeLink = data.youtube_link || "";
        this.status = data.status || "";
    }
}