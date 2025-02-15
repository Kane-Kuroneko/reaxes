cd ./packages
rm -rf utils/dist && rm -rf reaxes/dist && 
yarn workspace reaxes-utils build &&
yarn workspace reaxes build &&
cd ./reaxes
yarn publish
