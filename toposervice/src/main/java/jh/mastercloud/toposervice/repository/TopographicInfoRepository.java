package jh.mastercloud.toposervice.repository;

import jh.mastercloud.toposervice.model.TopographicInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TopographicInfoRepository extends MongoRepository<TopographicInfo, String> {
}
