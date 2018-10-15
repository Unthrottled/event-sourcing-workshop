package io.acari.event.source.config;

import com.mongodb.ConnectionString;
import com.mongodb.async.client.MongoClientSettings;
import com.mongodb.connection.ClusterSettings;
import com.mongodb.connection.netty.NettyStreamFactoryFactory;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSBuckets;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.SimpleReactiveMongoDatabaseFactory;

import javax.annotation.PreDestroy;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {

    private final EventLoopGroup eventLoopGroup = new NioEventLoopGroup();
    private final Environment environment;

    public MongoConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public com.mongodb.MongoClient lameMongoClient() {
        return new com.mongodb.MongoClient(environment.getProperty("acari.mongo.connectionString", "localhost:27017"));
    }

    @Bean
    public MongoTemplate lameMongoDatabase(com.mongodb.MongoClient lameMongoClient){
        return new MongoTemplate(lameMongoClient, getDatabaseName());
    }

    @Bean
    public MongoClient reactiveMongoClient() {
        return MongoClients.create(MongoClientSettings.builder()
                .streamFactoryFactory(NettyStreamFactoryFactory.builder()
                        .eventLoopGroup(eventLoopGroup)
                        .build())
                .clusterSettings(ClusterSettings.builder()
                        .applyConnectionString(new ConnectionString(
                                environment.getProperty("acari.mongo.connectionString", "localhost:27017")))
                        .build())
                .build());
    }

    @Override
    protected String getDatabaseName() {
        return environment.getProperty("acari.mongo.landingDatabase", "images");
    }

    @Bean
    public GridFSBucket gridFSBucket(MongoClient reactiveMongoClient) {
        return GridFSBuckets.create(reactiveMongoClient.getDatabase(getDatabaseName()));
    }

    @Bean
    public ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory(MongoClient reactiveMongoClient){
        return new SimpleReactiveMongoDatabaseFactory(reactiveMongoClient, "events");
    }

    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplateDefined(ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory){
        return new ReactiveMongoTemplate(reactiveMongoDatabaseFactory);
    }

    @PreDestroy
    public void shutdown(){
        eventLoopGroup.shutdownGracefully();
    }

}
