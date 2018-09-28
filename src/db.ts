import * as mongoose from "mongoose";


class DatabaseDAO {

  public connect(): void {
    
      mongoose.connect(process.env.DB_ACCESSS, { useNewUrlParser: true }, (err, res) => {
        if (err) {
          console.log ('ERROR connecting to MongoDB' + '. ' + err);
        } else {
          console.log ('Succeeded connected to MongoDB ');
        }
      });

      const db : mongoose.NativeConnection = mongoose.connection;
      
      db.on('error', (err) => {
        console.log("Mongoose default connection has occured "+err+" error");
      });
  
      db.on('disconnected', () => {
        console.log("Mongoose default connection is disconnected");
      });
  
      process.on('SIGINT', () => {
          db.close( () => {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
          });
      });

  }

}

export const databaseDAO = new DatabaseDAO();



