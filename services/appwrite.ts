import {Client, Databases, ID, Query} from "react-native-appwrite"

const DB_id_appwrie="67d1a16c000a14321421";
const collection_id="67d1a326001a0edabf09";
const Saved_collections_id="67d56a100039883a9344";
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject("67cfeaab000dfaf9c32b"); // Your project ID

const databases = new Databases(client);

export const updateSearchCount= async (query:String, movie:Movie)=>{
 
    try{
        const result = await databases.listDocuments(
            DB_id_appwrie !, // databaseId
            collection_id!, // collectionId
            [Query.equal("searchTerm",query)] // queries (optional)
        );
        if (result.documents.length>0){
            const existingMovies = result.documents[0];
            await  databases.updateDocument(
                DB_id_appwrie,
                collection_id,
                existingMovies.$id,
                {
                    count: existingMovies.count+1
                }
            )
        }
        else {
            await databases.createDocument(
                DB_id_appwrie,
                collection_id,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }
            )
        }
    }
    catch(error){
        console.error("Error updating search count:", error);
        throw error;
    }

}
export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const result = await databases.listDocuments(
            DB_id_appwrie!, // databaseId
            collection_id!, // collectionId
            [Query.limit(5), Query.orderDesc("count")] // queries (optional)
        );
  
        return result.documents as unknown as TrendingMovie[];
       
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error; // Ensure the error is properly thrown
    }
};
export const getSavedMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const result = await databases.listDocuments(
            DB_id_appwrie!, // databaseId
            Saved_collections_id!, // collectionId
            [] // queries (optional)
        );
    
        
  
        return result.documents as unknown as TrendingMovie[];
       
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error; // Ensure the error is properly thrown
    }
};
export const addSavedMovie = async (movie: Movie) => {
    try {
        // Check if the movie is already saved by querying the database
        const result = await databases.listDocuments(DB_id_appwrie, Saved_collections_id, [
            Query.equal('movie_id', [movie.id]),
        ]);

        // If the movie exists, delete it first
        if (result.documents.length > 0) {

            const movieToDelete = result.documents[0]; // Get the first document (assuming movie_id is unique)
            await databases.deleteDocument(DB_id_appwrie, Saved_collections_id, movieToDelete.$id); // Delete the document
            console.log('Existing movie deleted!');
        }


       else {
        await databases.createDocument(
            DB_id_appwrie,
            Saved_collections_id,
            ID.unique(),
            {
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }
        );
       }
      
     
    } catch (error) {
        console.error('Error saving or deleting movie:', error);
    }
};