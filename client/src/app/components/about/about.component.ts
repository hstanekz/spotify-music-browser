import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ SpotifyService ]
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  private spotifyService: SpotifyService;
  // inject the Spotify service
  constructor(service: SpotifyService) { 
    this.spotifyService = service
  }

  ngOnInit() {
  }

  async getAboutMe(): Promise<void> {
    try {
      const profileData = await this.spotifyService.aboutMe();
      this.name = profileData.name;
      this.profile_pic = profileData.imageURL;
      this.profile_link = profileData.spotifyProfile;

    } catch(error) {
      console.log('Could not fetch profile data:', error)
    }
    
  }
  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

}
/*
Once API requests can be made via the Express server (Part 1),
 edit the about component to call the endpoint created for the 
 “about me” page when the load info button is clicked. To do so, you will 
 need to inject the Spotify service you just edited. The Spotify API endpoint
  reference describes what this endpoint and other endpoints return. Update 
  the variables in the component’s .ts file and bind them to the appropriate 
  places in the .html file. This will populate the left side of the home page 
  with the logged in user’s name, profile picture, and a link to open their profile on Spotify.com.

*/