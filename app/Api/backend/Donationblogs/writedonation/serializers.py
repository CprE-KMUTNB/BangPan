from rest_framework import serializers
from blogs.models import Donation_blogs,Category

class CreateDonationSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)

    class Meta:

        model = Donation_blogs
        fields = ('name','write','description','reason','location',
        'Amount_requested','created','category','image')

#'image',
