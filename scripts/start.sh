rm -rf examples/dist && rm -rf reaxes/dist && 
yarn workspace reaxes-utils build &&
yarn workspace reaxes build &&
#wait
yarn workspace examples start
