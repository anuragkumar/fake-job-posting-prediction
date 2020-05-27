import pandas as pd


class Data:
    def __init__(self):
        self.data = pd.read_excel("../../data/fake_job_postings.xlsx")

    def get_random_sample(self):
        # getting all fraud data
        fraud = self.data[self.data['fraudulent'] == 1]
        # getting all real data
        real = self.data[self.data['fraudulent'] == 0]
        # filtering only 30 rows from them to show initially
        fraud = fraud.iloc[0:30]
        real = real.iloc[0:30]
        # creating a small balanced data frame
        small_balanced_data = pd.concat([fraud, real])
        # randomly re-shuffling the data
        small_balanced_data_random = small_balanced_data.sample(frac=1).reset_index(drop=True)
        return small_balanced_data_random
