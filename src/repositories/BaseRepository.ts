
// abstract base class that will hold all the common repo
// functionality. I was going to include the static repo instances
// and introduce a generic to pass in the repo type to spin it up, but
// the workaround for a generic on a static field was a bit hacky, and
// I didn't have much time left to implement it.
export abstract class BaseRepository {
    protected baseUrl: string = 'http://localhost:9001';
}