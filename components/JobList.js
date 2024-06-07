import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://94cd0440-3128-49eb-a37e-49db4ead7208.mock.pstmn.io/jobs?page=${page}`);
      setJobs(response.data.results);
      setTotalPages(Math.ceil(response.data.count / response.data.page_size));
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
  };

  const filteredJobs = jobs.filter(job => job.title?.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>Error: {error}</Text>;
  }

  if (filteredJobs.length === 0) {
    return <Text style={styles.centered}>No jobs found</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for jobs"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>{item.primary_details?.Place}</Text>
            <Text>{item.primary_details?.Salary}</Text>
            <Text>{item.primary_details?.Job_Type}</Text>
            <Text>{item.primary_details?.Experience}</Text>
            <Text>{item.primary_details?.Qualification}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button title="Previous Page" onPress={handlePreviousPage} disabled={currentPage === 1} />
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
        <Button title="Next Page" onPress={handleNextPage} disabled={currentPage === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  jobItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pageInfo: {
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default JobList;
