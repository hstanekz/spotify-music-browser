import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    return firstValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((res) => {
      return res;
    }, (err) => {
      return err;
    });
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    const encodedURI = encodeURIComponent(resource);
    const endpoint = `/search/${category}/${encodedURI}`;
    return this.sendRequestToExpress(endpoint).then(res => {
      let result;
      if (category === 'artist') {
        result = res.artists.items.map((element: any) => new ArtistData(element));
      } else if (category === 'album') {
        result = res.albums.items.map((element: any) => new AlbumData(element));
      } else if (category === 'track') {
        result = res.tracks.items.map((element: any) => new TrackData(element));
      } else {
        throw new Error("Invalid Category");
      }
      return result;
    }).catch(error => {
      console.log("Error fetching data in searchFor:", error);
      return [];
    });
  }
  

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const encodedURL = encodeURIComponent(artistId);
    const endpoint = `/artist/${encodedURL}`
    return this.sendRequestToExpress(endpoint).then((res) => {return new ArtistData(res)})
    ;
  }


  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    const encodedURL = encodeURIComponent(artistId);
    const endpoint = `/artist-related-artists/${encodedURL}`;
  
    return this.sendRequestToExpress(endpoint).then((res) => {
      // console.log('getRelatedArtists Response:', res); // Log the response
      return res.artists.map(element => new ArtistData(element));
    });
  }
  
  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const encodedURL = encodeURIComponent(artistId);
    const endpoint = `/artist-top-tracks/${encodedURL}`;

    return this.sendRequestToExpress(endpoint).then((res) => {
      // console.log('getTopTracksForArtist Response:', res); // Log the response
      return res.tracks.map((element) => new TrackData(element))
    })
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const encodedURL = encodeURIComponent(artistId);
    const endpoint = `/artist-albums/${encodedURL}`;

    return this.sendRequestToExpress(endpoint).then((res) => {
      // console.log('getAlbumsForArtist Response:', res); // Log the response
      return res.items.map((element) => {return new AlbumData(element)})
    })
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const encodedURL = encodeURIComponent(albumId);
    const endpoint = `/album/${encodedURL}`;
    return this.sendRequestToExpress(endpoint).then((res) => {return new AlbumData(res)})
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const encodedURL = encodeURIComponent(albumId);
    const endpoint = `/album-tracks/${encodedURL}`;
    return this.sendRequestToExpress(endpoint).then((res) => {
      // console.log('getTracksForAlbum Response', res);
      return res.items.map((element) => {return new TrackData(element)})
    })
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const encodedURL = encodeURIComponent(trackId);
    const endpoint = `/track/${encodedURL}`;
    return this.sendRequestToExpress(endpoint).then((res) => {
      return new TrackData(res)})

  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    const encodedURL = encodeURIComponent(trackId);
    const endpoint = `/track-audio-features/${encodedURL}`;
    return this.sendRequestToExpress(endpoint).then((res) => {
      return TrackFeature.FeatureTypes.map(featureType => {
        return new TrackFeature(featureType, res[featureType]);
      });
    })
  }
}
