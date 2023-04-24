
def get_final_outcome(name, year_established, summary, pre_assesment_value):

    print('name: ', name, flush=True)
    print('year_established ', year_established, flush=True)
    print('summary ', summary, flush=True)
    print('pre_assesment_value ', pre_assesment_value, flush=True)

    return 'Approved' if pre_assesment_value > 50 else 'Declined'
